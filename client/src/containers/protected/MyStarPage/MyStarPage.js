import { observer, inject } from 'mobx-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import { PropTypes as MobxPropTypes } from 'mobx-react'
import { Button } from 'reactstrap'
// import './ChineseTranslationPage.css'

import { keys } from 'src/i18n/resources'

import AddStarModal from 'src/components/AddStarModal'
import StarCard from 'src/components/StarCard'
import Tags from 'src/components/Tags'


@inject(stores => {
  const { starsStore, tagsStore } = stores
  const { loadStars, loadStarsWithTags, removeStar, loading, error, stars, addStar, editStar } = starsStore
  const { loadTags, setSelectedTags } = tagsStore
  return {
    loadTags,
    setSelectedTags,
    loadStars,
    loadStarsWithTags,
    removeStar,
    addStar,
    editStar,
    stars,
    loading,
    error,
  }
})
@withNamespaces()
@observer
class MyStarPage extends Component {
  constructor(props) {
    super(props)
    this.renderStars = this.renderStars.bind(this)
  }


  static propTypes = {
    t: PropTypes.func.isRequired,
    setSelectedTags: PropTypes.func.isRequired,
    loadTags: PropTypes.func.isRequired,
    loadStars: PropTypes.func.isRequired,
    loadStarsWithTags: PropTypes.func.isRequired,
    removeStar: PropTypes.func.isRequired,
    addStar: PropTypes.func.isRequired,
    editStar: PropTypes.func.isRequired,
    stars: MobxPropTypes.observableArray,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }


  componentDidMount() {
    this.props.loadTags()
    this.props.loadStars()
  }

  renderStars() {
    const { stars, removeStar, editStar } = this.props

    return (
      <div>
        {stars.map(star => {
          return (
            <StarCard key={star.id} star={star} removeStar={removeStar} editStar={editStar} />
          )
        })}
      </div>
    )
  }

  render() {
    const { addStar, setSelectedTags, loadStarsWithTags, t } = this.props

    return (
      <div>
        <h1>{t(keys.myStarPage)}</h1>
        <Tags setTags={setSelectedTags}/>
        <Button onClick={() => loadStarsWithTags()} color={'success'} block >
          {t(keys.search)}
        </Button>
        <br/>
        <AddStarModal addStar={addStar}/>
        {this.renderStars()}
      </div>
    )
  }
}

export default MyStarPage
