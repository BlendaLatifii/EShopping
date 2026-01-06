using Application.DTO.Request;
using Application.DTO.Response;
using Application.Services.Interfaces;
using Domain.Entities;
using Infrastructure.Repositories.Interfaces;

namespace Application.Services
{
    public class ProductService : IProductService
    {

        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
           _productRepository = productRepository;
        }

        public async Task AddProduct(AddProductRequestDto addProductRequestDto)
        {
            var product = MapToEntity(addProductRequestDto);

            await _productRepository.AddAsync(product, CancellationToken.None);
        }

        public async Task<List<ProductResponseDto>> GetAllProducts()
        {
            var products = await _productRepository.GetAllAsync(CancellationToken.None);

            var model = products.Select(x => MapToDto(x)).ToList();

            return model;
        }

        public async Task<ProductResponseDto> GetProductById(Guid id)
        {
            var product = await _productRepository.GetByIdAsync(id, CancellationToken.None);
            if (product == null) 
            {
                throw new Exception("Product not found");
            }

            var model = MapToDto(product);

            return model;
        }

        public async Task UpdateProduct(Guid id, UpdateProductRequestDto updateProductRequestDto)
        {
            var product = await _productRepository.GetByIdAsync(id, CancellationToken.None);
            if (product == null) 
            {
                throw new Exception("Product not found");
            }

            product = MapUpdateProduct(product, updateProductRequestDto);

            await _productRepository.UpdateAsync(product, CancellationToken.None);
        }

        private Product MapUpdateProduct(Product product, UpdateProductRequestDto updateProductRequestDto)
        {
            product.Name = updateProductRequestDto.Name ?? product.Name;
            product.Description = updateProductRequestDto.Description ?? product.Description;
            product.Price = updateProductRequestDto.Price ?? product.Price;
            product.CategoryId = (Guid)(updateProductRequestDto.CategoryId != null ? updateProductRequestDto.CategoryId : product.CategoryId);

            return product;
        }

        public async Task DeleteProduct(Guid id)
        {
            var product = await _productRepository.GetByIdAsync(id, CancellationToken.None);
            if (product == null) 
            {
                throw new Exception("Product not found");
            }

            await _productRepository.DeleteAsync(product, CancellationToken.None);
        }

        private ProductResponseDto MapToDto(Product product)
        {
            return new ProductResponseDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                CategoryId = product.CategoryId
            };
        } 

        private Product MapToEntity(AddProductRequestDto addProductRequestDto)
        {
            return new Product
            {
                Name = addProductRequestDto.Name,
                Description = addProductRequestDto.Description,
                Price = addProductRequestDto.Price,
                CategoryId = addProductRequestDto.CategoryId
            };
        } 
    }
}
