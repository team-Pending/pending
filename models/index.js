const User = require('./User');
const Note = require('./Note');


User.hasMany(Note, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Note.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Note };