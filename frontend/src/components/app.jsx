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
  return <div className={style.app}>react Starter 🚀 </div>;
};

export default hot(module)(App);