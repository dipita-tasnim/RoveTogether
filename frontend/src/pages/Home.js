// const Home = () => {
//     return (
//         <div className="home">
//             <h2>Home</h2>
//         </div>
//     )
// }

// export default Home


export default function Home() {
    return (
      <div className="home-wrapper">
        <div className="home-card">
          <div className="home-header">
            <div>
              <h2 className="home-title">Create Your Ride and Find a Travel Buddy!</h2>
              <p className="home-subtext">Need to head somewhere? Create a post and find friends to share the journey with. It’s fast, easy, and safe!</p>
            </div>
            <button className="create-new-post-button">+ Create New Post</button>
          </div>
        </div>
      </div>
    );
  }
  