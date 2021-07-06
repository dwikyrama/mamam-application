import Detail from '../views/pages/detail'
import Recommendation from '../views/pages/recommendation'

const routes = {
  '/': Recommendation, // default page
  '/recommendation': Recommendation,
  '/detail/:id': Detail
}

export default routes
