using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.OrderStatus)
                .WithOne()
                .HasForeignKey<Order>(x => x.OrderStatusId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
