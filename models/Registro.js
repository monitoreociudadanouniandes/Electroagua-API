module.exports = function(sequelize, DataTypes) {
	var Registro = sequelize.define(
		'Registro',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			timestamp: {
				type: DataTypes.STRING,
				allowNull: false
			},
			longitude: {
				type: DataTypes.STRING,
				allowNull: false
			},
			latitude: {
				type: DataTypes.STRING,
				allowNull: false
			},
			hg: {
				type: DataTypes.DOUBLE,
				allowNull: false
			},
			temp: {
				type: DataTypes.DOUBLE,
				allowNull: false,
				validate: { min: 0, max: 60 }
				// 0 a 60
			},
			conduct: {
				type: DataTypes.DOUBLE,
				validate: { min: 0, max: 5000 },
				allowNull: false
				// 0 - 5000
			},
			od: {
				type: DataTypes.DOUBLE,
				validate: { min: 0, max: 100 },
				allowNull: false
				// 0 - 100
			},
			pH: {
				type: DataTypes.DOUBLE,
				validate: { min: 0, max: 15 },
				allowNull: false
				// 0 -14
			},
			region: {
				type: DataTypes.INTEGER,
				allowNull: false
			}
		},
		{
			indexes: [
				{
					unique: true,
					fields: ['id_celular', 'timestamp']
				}
			]
		}
	);

	Registro.associate = function(models) {
		Registro.belongsTo(models.Celular, {
			as: 'celular',
			foreignKey: {
				name: 'id_celular',
				allowNull: false
			}
		});
	};
	return Registro;
};
