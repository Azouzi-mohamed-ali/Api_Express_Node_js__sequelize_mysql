const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('article', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    designation: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    reference: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    marque: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    qtestock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    prix: {
      type: DataTypes.DECIMAL(6,3),
      allowNull: false
    },
    imageart: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    scategorieID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'scategorie',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'article',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "scategorieID",
        using: "BTREE",
        fields: [
          { name: "scategorieID" },
        ]
      },
    ]
  });
};
