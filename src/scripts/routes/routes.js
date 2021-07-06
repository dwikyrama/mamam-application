import Detail from '../views/pages/detail'
import Recommendation from '../views/pages/recommendation'
import Favorite from '../views/pages/favorite'

const routes = {
  '/': Recommendation, // default page
  '/recommendation': Recommendation,
  '/favorite': Favorite,
  '/detail/:id': Detail
}

export default routes
