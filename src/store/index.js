import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    passwords_info: [],
    lastID: 0,
    success: true // успешно или неуспешно завершилась операция
  },
  mutations: {
    update_passwords(state, passwords){
      state.passwords_info = passwords
      state.success = true
    },
    update_one_password(state, password){
      let index = 0
      for (let value in state.passwords_info){
        if (value.id === password.id) break;
        index++
      }
      state.passwords_info[index] = {...password}
      state.success = true
    },
    add_password(state, password){
      state.passwords_info.push(password)
      state.success = true
    },
    update_id(state, id){
      state.lastID = id
    },
    delete_password(state, id){
      let index = 0;
      for(let i = 0; i < state.passwords_info.length; i++){
        if(state.passwords_info[i].id === id) {
          index = i;
          break
        }
      }
      state.passwords_info.splice(index, 1)
      state.success = true
    },
    throw_error(state){
      state.success = false
    },
    sort_passes(state, payload){
      let new_state = state.passwords_info.slice()
      if (payload.sorted_by === "name"){
        if (payload.ascending){
          new_state.sort(function(a, b) {
            if (a.name < b.name){ return 1; }
            if (a.name === b.name){ return 0; }
            if (a.name > b.name){ return -1; }
            return 0
          })
        } else {
          new_state.sort(function(a, b) {
            if (a.name < b.name){ return -1; }
            if (a.name === b.name){ return 0; }
            if (a.name > b.name){ return 1; }
            return 0
          })
        } 
      }
      if (payload.sorted_by === "date"){
        new_state.sort(function (a, b) {
          function getDate(date){
            let new_date = date.split('.')
            new_date = new_date[1] + "-" + new_date[0] + "-" + new_date[2]
            return new Date(new_date)
          }
          if (payload.ascending){
            return getDate(b.date) - getDate(a.date)
          } else {
            return getDate(a.date) - getDate(b.date)
          }
        })
      }
      state.passwords_info = new_state.slice()
    }
  },
  actions: {
    async get_passwords({commit}){
      try {
        const passwords = await axios.get("http://localhost:3000/passwords")
        commit('update_passwords', passwords.data)
      } catch (e) {
        commit("throw_error")
      }
    },
    async update_password({commit}, password){
      try {
        await axios.put("http://localhost:3000/passwords/" + password.id, password)
        commit('update_one_password', password)
      } catch {
        commit("throw_error")
      }
    },
    async add_password({commit}, password){
      try {
        await axios.post("http://localhost:3000/passwords/", password)
        await axios.put("http://localhost:3000/lastid/", this.state.lastID + 1)
        commit('add_password', password)
        commit('update_id', this.state.lastID + 1)
      } catch {
        commit("throw_error")
      }
    },
    async getID({commit}){
      try {
        const id = await axios.get("http://localhost:3000/lastid")
        commit('update_id', id.data.lastid)
      } catch (e) {
        commit("throw_error")
      }
    },
    async delete_password({commit}, id){
      try {
        await axios.delete("http://localhost:3000/passwords/" + id)
        commit('delete_password', id)
      } catch (e) {
        commit("throw_error")
      }
    },
  },
  getters: {
    password_info: state => id => {
      return state.passwords_info.filter((pass) => pass.id == id)[0]
    }
  }
})
