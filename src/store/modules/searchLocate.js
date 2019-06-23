import Vue from 'vue'


import { searchLocation } from '@/api/api.searchLocate'
import { setStorage, getStorage } from '../../services/workWithLocalStorage'

const state = {
  searchResult: [],
  favoriteLocation: {}
}

const getters = {
  getSearchResult: state => state.searchResult,
  getCurrentLocationWeather (state, getters, rootState, rootGetters) {
    return rootGetters['weather/getLocationWeather']
  },
  getFavoriteLocation: state => state.favoriteLocation
}

const mutations = {
  SET_SEARCH_RESULT: (state, data) => state.searchResult = data,
  CLEAR_SEARCH_RESULT: (state) => state.searchResult = [],
  ADD_TO_FAVORITE_LOCATION: (state, {data, key}) => state.favoriteLocation = {...state.favoriteLocation, [key]: data},
  DELETE_FAVORITE_LOCATION: (state, key) => Vue.delete(state.favoriteLocation, key)
}

const actions = {
  searchLocations: async ({commit}, text) => {
    const data = await searchLocation(text)
    commit('SET_SEARCH_RESULT', data)
  },
  clearSearchResult: ({commit}) => {
    commit('CLEAR_SEARCH_RESULT')
  },
  addToFavoriteLocation: ({commit, getters}) => {
    let currentLocationData = {
      location: getters.getCurrentLocationWeather.location,
      current: getters.getCurrentLocationWeather.current,
    }
    let key = (`${currentLocationData.location.region} ${currentLocationData.location.name}`).replace(/ /ig, '%20')
    commit('ADD_TO_FAVORITE_LOCATION', {data: currentLocationData, key})
  },
  deleteFavoriteLocation: ({commit}, key) =>{
    console.log(key)
    commit('DELETE_FAVORITE_LOCATION', key)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}