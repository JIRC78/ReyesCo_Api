/**
 * Saluda a un usuario.
 * @param {string} name - El nombre del usuario.
 * @returns {string} El saludo para el usuario.
 */
const greet = name => 'hola ' + name;

/**
 * Obtiene datos de usuarios desde una API.
 * @returns {Promise<Object[]>} Un array de objetos que representan a los usuarios.
 */
const users = async () => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users?_limit=2')
    return res.data;
}