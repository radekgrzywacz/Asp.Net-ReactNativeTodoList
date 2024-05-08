using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class SeedingMoreTodos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Todos",
                columns: new[] { "Id", "AppUserId", "Description", "DueDate", "IsDone", "Title" },
                values: new object[,]
                {
                    { 6, "608c3c92-e757-48d9-9a5e-1446a283e194", "Visit grandma.", new DateOnly(2024, 5, 1), 0, "Visit grandma" },
                    { 7, "608c3c92-e757-48d9-9a5e-1446a283e194", "Complete this app.", new DateOnly(2024, 5, 3), 1, "Complete app" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "Id",
                keyValue: 7);
        }
    }
}
