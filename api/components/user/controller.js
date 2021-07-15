const nanoid = require('nanoid');

//const { nanoid } = require('nanoid')
const auth = require('../auth');

const TABLA = 'user';
const TABLA2 = 'auth';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }

    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        const user = {
            id : body.id,
            name: body.name,
            username: body.username,
        }

         if (body.id) {
             user.id = body.id;
         } else {
             console.log('Falta el id');
         }

         if (body.password || body.username) {
             await auth.upsert({
                 id: user.id,
                 username: user.username,
                 password: body.password,
             })
         }

        return store.upsert(TABLA, user);
    }

   async function remove(id) {
       if (store.remove(TABLA,  id)) {
        return store.remove(TABLA2,  id)
       }
       
    }

     


    return {
        list,
        get,
        upsert,
        remove,
              
    };
}