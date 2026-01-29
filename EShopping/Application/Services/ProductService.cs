using Application.DTO.Request;
using Application.DTO.Response;
using Application.Services.Interfaces;
using Domain.Entities;
using Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

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
            var imageUrls = new List<string>();
            var folderPath = Path.Combine("wwwroot/images/products");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderPath);
            if (!Directory.Exists(pathToSave))
            {
                Directory.CreateDirectory(folderPath);
            }

            foreach (var file in addProductRequestDto.Images)
            {
                var fileName = file.FileName;
                var fullPath = Path.Combine(folderPath, fileName);

                if (File.Exists(fullPath))
                {
                    throw new Exception("Already exists");
                }

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                imageUrls.Add($"/images/products/{fileName}");
            }

            var product = MapToEntity(addProductRequestDto, imageUrls);

            await _productRepository.AddAsync(product, CancellationToken.None);
        }

        public async Task<List<ProductResponseDto>> GetAllProducts()
        {
            var products = await _productRepository.GetProductsWithCategory(CancellationToken.None);

            var model = products.Select(x => MapToDto(x)).ToList();

            return model;
        }

        public async Task<ProductResponseDto> GetProductById(Guid id)
        {
            var product = await _productRepository.GetProductWithCategory(id, CancellationToken.None);
            if (product == null) 
            {
                throw new Exception("Product not found");
            }

            var model = MapToDto(product);

            return model;
        }

        public async Task<List<ProductResponseDto>> GetProductByCategory(Guid categoryId)
        {
            var products = _productRepository.Query()
                                    .Where(x => x.CategoryId == categoryId);

            var model = await products.Select(x => MapToDto(x)).ToListAsync();

            return model;
        }

        public async Task UpdateProduct(Guid id, UpdateProductRequestDto updateProductRequestDto)
        {
            var product = await _productRepository.GetByIdAsync(id, CancellationToken.None);
            if (product == null) 
            {
                throw new Exception("Product not found");
            }

            product = await MapUpdateProduct(product, updateProductRequestDto);

            await _productRepository.UpdateAsync(product, CancellationToken.None);
        }

        private async Task<Product> MapUpdateProduct(Product product, UpdateProductRequestDto dto)
        {
            product.Name = dto.Name ?? product.Name;
            product.Description = dto.Description ?? product.Description;
            product.Price = dto.Price ?? product.Price;
            product.CategoryId = dto.CategoryId ?? product.CategoryId;

            //&& dto.Images.Count > 0
            if (dto.Images != null)
            {
                
                var imageUrls = new List<string>();
                foreach (var file in dto.Images)
                {
                    var fileName = Path.GetExtension(file.FileName);
                    var filePath = Path.Combine("wwwroot/images/products", fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    imageUrls.Add("/images/products/" + fileName);
                }

                
                product.ImageUrl = string.Join(",", imageUrls);
            }

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

        public async Task<List<ProductResponseDto>> SearchProduct(string? searchTerm, string? sortBy)
        {
            var query = _productRepository.Query()
                .Include(x => x.Category)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                searchTerm = searchTerm.ToLower();

                query = query.Where(x =>
                    x.Name.ToLower().Contains(searchTerm) ||
                    x.Description.ToLower().Contains(searchTerm) ||
                    x.Category.Name.ToLower().Contains(searchTerm));
            }

            query = sortBy switch
            {
                "price-asc" => query.OrderBy(x => x.Price),
                "price-desc" => query.OrderByDescending(x => x.Price),
                _ => query
            };

           var products = await query.ToListAsync();

           var model = products.Select(x => MapToDto(x)).ToList();

           return model;
        }

        private ProductResponseDto MapToDto(Product product)
        {
            return new ProductResponseDto
            {
                Id = product.Id,
                ImageUrl = product.ImageUrl,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                CategoryId = product.CategoryId,
                CategoryName = product.Category.Name,
            };
        } 

        private Product MapToEntity(AddProductRequestDto addProductRequestDto, List<string> imageUrls)
        {
            return new Product
            {
                ImageUrl = string.Join(",", imageUrls),
                Name = addProductRequestDto.Name,
                Description = addProductRequestDto.Description,
                Price = addProductRequestDto.Price,
                CategoryId = addProductRequestDto.CategoryId
            };
        }

        public async Task<List<ListItemModel>> GetProductSelectList()
        {
            var category = await _productRepository.Query()
                .Select(x => new ListItemModel
                {
                    Id = x.Id,
                    Name = x.Name,
                }).ToListAsync();

            return category;
        }
    }
}
