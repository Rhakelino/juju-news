import { useEffect, useState } from 'react';
import 'aos/dist/aos.css'; // Import AOS CSS
import AOS from 'aos'; // Import AOS

const timeAgo = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);
  const months = Math.floor(diffInSeconds / 2592000);
  const years = Math.floor(diffInSeconds / 31536000);

  if (minutes < 1) return 'Beberapa detik yang lalu';
  if (minutes < 60) return `${minutes} menit yang lalu`;
  if (hours < 24) return `${hours} jam yang lalu`;
  if (days < 30) return `${days} hari yang lalu`;
  if (months < 12) return `${months} bulan yang lalu`;
  return `${years} tahun yang lalu`;
};

const getArticles = async () => {
  const response = await fetch("https://api-berita-indonesia.vercel.app/cnn/terbaru");
  const data = await response.json();
  return data.data.posts;
};

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 500, easing: 'ease-in-out', once: true });

    const fetchArticles = async () => {
      const data = await getArticles();
      setArticles(data);
    };

    fetchArticles();

    // Set timeout to simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false); // Stop loading after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Clean up timeout on unmount
  }, []);

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a>default</a></li>
              <li><a>default</a></li>
              <li><a>default</a></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-2xl font-bold">Juju News</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
      <div className="flex carousel w-full">
        {!loading && (
          <div id="item1" className="carousel-item w-full h-[60vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh]">
            <img
              src="./images/bg1.jpg"
              className="w-full h-full object-cover"
              alt="Background Image"
            />
          </div>
        )}
        {loading && (
           <div className="w-full h-[60vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] animate-pulse bg-gray-800"></div>
        )}
      </div>

      <h1 className='text-center mt-4 text-2xl font-bold'>Berita Terbaru</h1>
      <hr className="w-1/2 text-center mx-auto border-2 rounded mt-1 opacity-15" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 m-5">
        {articles.map((article, index) => (
          <a href={article.link} key={index} target='_blank' className="card card-compact w-full bg-base-100 shadow-xl cursor-pointer" data-aos="fade-in">
            <div key={index}>
              <figure>
                <img src={article.thumbnail} alt={article.title} className="w-full h-48 object-cover transition hover:scale-105" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{article.title}</h2>
                <p>{timeAgo(article.pubDate)}</p>
                <div className="card-actions flex justify-end">
                  <a href={article.link} className="btn btn-primary btn-md" target='_blank'>Read More</a>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
      <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by Rhakelino</p>
        </aside>
      </footer>
    </>
  );
}

export default App;
