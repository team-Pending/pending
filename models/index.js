const User = require('./User');
const Upload = require('./Upload');

User.hasMany(Upload, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Upload.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Upload };