import Recommendation from '../views/pages/recommendation'
import Detail from '../views/pages/detail'
import Favorite from '../views/pages/favorite'

const routes = {
  '/': Recommendation, // default page
  '/recommendation': Recommendation,
  '/detail/:id': Detail,
  '/favorite': Favorite
}

export default routes
