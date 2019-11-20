import style from "../assets/scss/app.scss";
import { hot } from "react-hot-loader";


const App = () => {
  console.log('ttt')
  axios({
    method: 'get',
    url: 'api/departure/'
  }).then(response => {
    console.log('pp')
    console.log(response.data)
  })
  return (
    <div>
      <div className="flex-container">
        <div className={style.app}>react Starter 🚀 </div>;
        <button className="btn--success">Valider</button>
      </div>
    </div>
  )
};

export default hot(module)(App);