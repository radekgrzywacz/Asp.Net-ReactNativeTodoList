using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class SeedingTodos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Todos",
                columns: new[] { "Id", "AppUserId", "Description", "DueDate", "IsDone", "Title" },
                values: new object[,]
                {
                    { 1, "608c3c92-e757-48d9-9a5e-1446a283e194", "Finish all the tasks for the project.", new DateOnly(2024, 5, 10), 0, "Complete project" },
                    { 2, "608c3c92-e757-48d9-9a5e-1446a283e194", "Create slides and practice the presentation.", new DateOnly(2024, 5, 15), 0, "Prepare presentation" },
                    { 3, "608c3c92-e757-48d9-9a5e-1446a283e194", "Participate in the weekly team meeting.", new DateOnly(2024, 5, 20), 0, "Attend meeting" },
                    { 4, "608c3c92-e757-48d9-9a5e-1446a283e194", "Review and provide feedback on the code changes.", new DateOnly(2024, 5, 12), 1, "Review code" },
                    { 5, "608c3c92-e757-48d9-9a5e-1446a283e194", "Perform thorough testing of the application functionality.", new DateOnly(2024, 5, 17), 1, "Test application" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Todos",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
