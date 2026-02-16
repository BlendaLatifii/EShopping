using Application.DTO.Response;
using Application.Services.Interfaces;
using Domain.Entities;
using Microsoft.ML;
using Microsoft.ML.Data;

namespace Application.Services
{
    public class ProductRecomandationService : IProductRecomandationService
    {

        private readonly IProductService _productService;
        private readonly MLContext _mlContext;

        public ProductRecomandationService( IProductService productService)
        {
            _mlContext = new MLContext();
            _productService = productService;
        }

        public async Task<List<ProductResponseDto>> GetSimilarProducts(Guid productId, int top = 3)
        {

            var products = await _productService.GetAllProducts();

            var productMLList = products.Select(p => new ProductML
            {
                Name = p.Name,
                Description = p.Description,
                CategoryName = p.CategoryName
            }).ToList();
           
            var data = _mlContext.Data.LoadFromEnumerable(productMLList);
            var pipeline = _mlContext.Transforms.Concatenate("CombinedText",
                                            nameof(ProductML.Name),
                                            nameof(ProductML.Description),
                                            nameof(ProductML.CategoryName))
                            .Append(_mlContext.Transforms.Text.FeaturizeText("Features", "CombinedText"));
           
            var model = pipeline.Fit(data);
            var transformedData = model.Transform(data);
            var featureColumn = transformedData.GetColumn<float[]>("Features").ToList();

            int targetIndex = products.FindIndex(p => p.Id == productId);
            if (targetIndex < 0) return new List<ProductResponseDto>();

            var topProducts = products
                     .Select((p, i) => new { Product = p, Similarity = i != targetIndex ? CosineSimilarity(featureColumn[targetIndex], featureColumn[i]) : -1 })
                     .OrderByDescending(x => x.Similarity)
                     .Take(top)
                     .Select(x => x.Product)
                     .ToList();

            return topProducts;
        }

        private static float CosineSimilarity(float[] a, float[] b)
        {
            float dot = 0;
            float magA = 0;
            float magB = 0;
            for (int i = 0; i < a.Length; i++)
            {
                dot += a[i] * b[i];
                magA += a[i] * a[i];
                magB += b[i] * b[i];
            }
            return dot / ((float)Math.Sqrt(magA) * (float)Math.Sqrt(magB));
        }
    }
}
