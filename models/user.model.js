module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        len:10
      },
      password:{
        type:DataTypes.STRING,
        allowNull:false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },     
    });
  
    User.associate = (models) => {
    };
    return User;
  };
  