// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE"
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id"
});

// Products belongToMany Tags (through ProductTag as product_id)
Product.belongsToMany(Tag, {
  through: ProductTag, 
  foreignKey: "product_id"
});

// Tags belongToMany Products (through ProductTag as tag_id)
Tag.belongsToMany(Product, {
  through: ProductTag, 
  foreignKey: "tag_id"
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag
}
