import { observable, action } from 'mobx'

import tagsStore from '../tags'

import {
  getStarsForUser,
  getStarsForUserWithTags,
} from '../../apollo/queries/stars'

import {
  addStarMutation,
  removeStarMutation,
} from '../../apollo/mutatations/stars'

import authenticationStore from '../authentication/index'

class StarsStore {
  @observable error = null
  @observable loading = false
  @observable stars = []

  constructor() {
  }


  @action resetData() {
    self.error = null
    self.loading = false
    self.stars = []
  }

  @action async addStar({ githubRepository, description, tags }) {
    self.error = null
    self.loading = true
    const { username } = authenticationStore
    try {
      await addStarMutation({
        username,
        githubRepository,
        description,
        tags,
      })

      await self.loadStars({ username })
    } catch (err) {
      self.error = err.message
    }
    self.loading = false
  }

  @action async removeStar({ id }) {
    self.error = null
    self.loading = true
    const { username } = authenticationStore

    try {
      await removeStarMutation({
        id,
      })
      await self.loadStars({ username })
    } catch (err) {
      self.error = err.message
    }
    self.loading = false
  }

  @action async loadStarsWithTags() {
    self.error = null
    self.loading = true
    const { username } = authenticationStore
    const { selectedTags } = tagsStore

    try {
      const { data } = await getStarsForUserWithTags({
        username,
        tags: selectedTags,
      })
      self.stars = data.starsWithTagOrOperation
    } catch (err) {
      self.error = err.message
    }
    self.loading = false
  }

  @action async loadStars() {
    self.error = null
    self.loading = true
    const { username } = authenticationStore
    try {
      const { data } = await getStarsForUser({
        username,
      })
      self.stars = data.stars
    } catch (err) {
      self.error = err.message
    }
    self.loading = false
  }


}

const self = new StarsStore()

export default self
