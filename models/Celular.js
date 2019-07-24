module.exports = function(sequelize, DataTypes) {
	var Celular = sequelize.define(
		'Celular',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			imei: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false
			}
		},
		{ freezeTableName: true, underscored: true }
	);

	Celular.associate = function(models) {
		Celular.hasMany(models.Registro, { foreignKey: 'id_celular' });
	};
	return Celular;
};
