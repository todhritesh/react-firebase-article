import AddArticles from "./components/AddArticles";
import Articles from "./components/Articles";

function App() {
  return ( 
    <div className = "container" >
      <div className="row">
        <div className="col-md-8">
          <Articles/>
        </div>
        <div className="col-md-4">
          <AddArticles/>
        </div>
      </div>
    </div>
  );
}

export default App;