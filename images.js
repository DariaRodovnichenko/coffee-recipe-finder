// const { Component } = require("react");

// class App extends Component {
//   state = {
//     query: "",
//     images: [],
//     page: 1,
//   };

//   handleSubmit = (evt) => {
//     evt.preventDefault();
//     this.setState({
//       query: evt.target.elements.query.value,
//       images: [],
//       page: 1,
//     });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
//       // http request
//     }
//   }

//   handleLoadMore = () => {
//     this.setState((prevState) => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <input type="text" name="query"></input>
//           <button type="submit"></button>
//         </form>
//         {this.state.images.length > 0 && <div>Gallery</div>}
//         <button onClick={this.handleLoadMore}>Load more</button>
//       </div>
//     );
//   }
// }
