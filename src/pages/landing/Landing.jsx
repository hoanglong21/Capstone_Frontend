import { Link } from "react-router-dom";

import video from "../../assets/video/learn once, use anywhere.mp4";
import img1 from "../../assets/images/blog_1.jpg";
import img2 from "../../assets/images/blog_2.jpg";
import img3 from "../../assets/images/blog_3.jpg";
import "./landing.css";

const Landing = () => {
  return (
    <>
      <div className="landing__video">
        <video
          id="landingVideo"
          controls
          muted={true}
          autoPlay={true}
          loop
          src={video}
        />
      </div>
      <div className="landing__ti text-center">
        <h2 className="heading__line">What is NihongoLevelUp?</h2>
        <p className="lead text-muted">
          NihongoLevelUp is a language learning tool specifically designed to
          support learners of the Japanese language. Its purpose is to help
          learners overcome difficulties encountered during the Japanese
          language learning process.
        </p>
      </div>
      <div className="landing__content">
        <div className="landing__description">
          <div className="landing__title">
            <h2 className="landing__assembly2">
              Memorize Faster with Flashcards, Study Sets, Quiz
            </h2>
          </div>
          <div className="landing-description2">
            <p className="landing__assembly paragraph"></p>
            <p className="landing__assembly paragraph2">
              Research shows that self-testing with flashcards is effective than
              rereading your notes. NihongoLevelUp is used by students in a
              variety of Japanese topics.
            </p>
            <p></p>
          </div>
          <div className="landing__link">
            <div className="landing__container">
              <Link
                className="landing__btn"
                role="button"
                tabIndex="0"
                to="/login"
              >
                <span>Start With Us</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="landing-image">
          <img
            alt=""
            srcSet="https://images.prismic.io/quizlet-prod/130dc509-6919-47bc-b27d-17f600a41b0c_IntlFirstSlice.png"
          />
        </div>
      </div>
      <div className="landing__content">
        <div className="landing-image2">
          <img
            alt=""
            srcSet="https://images.prismic.io/quizlet-prod/1d359d1f-be06-481d-af18-30a4d93b3b0f_commute-image.png"
          />
        </div>
        <div className="landing__description">
          <div className="landing__title">
            <h2 className="landing__assembly2">
              Yesterday's commute time, today is class again
            </h2>
          </div>
          <div className="landing-description2">
            <p className="landing__assembly paragraph"></p>
            <p className="landing__assembly paragraph2">
              Learning anywhere, anytime.
            </p>
            <p></p>
          </div>
          <div className="landing__link">
            <div className="landing__container">
              <Link
                className="landing__btn"
                role="button"
                tabIndex="0"
                to="/discovery/sets"
              >
                <span>Explore More</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="section-title">
        <h4 className="title text-center">
          Have Question ? Get in touch!
        </h4>
        <p
          className="text-muted para-desc mx-auto text-center"
        >
          Start working with{" "}
          <span className="text-primary fw-bold">NihongoLevelUp</span> that can
          provide everything you need about Japanese
        </p>
      </div>
      <div
        className="row feedback"
        style={{
          marginTop: "50px",
          width: "80%",
          height: "40%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div className="col-12 col-md-6 col-lg-4">
          <div
            className="single-blog wow fadeIn res-margin"
            data-wow-duration="2s"
          >
            <div className="blog-thumb">
              <img src={img1} alt="" className="row__img" />
            </div>
            <div className="blog-content p-4">
              <ul className="meta-info d-flex justify-content-between">
                <li className="landing_li">By Anna</li>
                <li className="landing_li">
                  <a href="/">Feb 05, 2019</a>
                </li>
              </ul>
              <h3 className="blog-title my-3">
                <a href="/">Rate For 5 Stars</a>
              </h3>
              <p>
                NihongoLevelUp has been supporting my success since GCSE.
                Flashcards available on the go are single handedly getting me
                through university. Wish the website to grow more and more.
              </p>
              <a href="/" className="blog-btn mt-3">
                Read More
              </a>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div
            className="single-blog wow fadeIn res-margin"
            data-wow-duration="2s"
          >
            <div className="blog-thumb">
              <a href="/">
                <img src={img2} alt="" className="row__img" />
              </a>
            </div>
            <div className="blog-content p-4">
              <ul className="meta-info d-flex justify-content-between">
                <li className="landing_li">By Jessica</li>
                <li className="landing_li">
                  <a href="/">Feb 05, 2019</a>
                </li>
              </ul>
              <h3 className="blog-title my-3">
                <a href="/">A Nice Website For Learning</a>
              </h3>
              <p>
                “NihongoLevelUp has allowed me to transition my studying from
                passive to active recall. This has allowed me to memorise
                information faster than simply re-reading notes.”
              </p>
              <a href="/" className="blog-btn mt-3">
                Read More
              </a>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div
            className="single-blog wow fadeIn res-margin"
            data-wow-duration="2s"
          >
            <div className="blog-thumb">
              <a href="/">
                <img src={img3} alt="" className="row__img" />
              </a>
            </div>
            <div className="blog-content p-4">
              <ul className="meta-info d-flex justify-content-between">
                <li className="landing_li">By John</li>
                <li className="landing_li">
                  <a href="/">Mar 05, 2019</a>
                </li>
              </ul>
              <h3 className="blog-title my-3">
                <a href="/">Good Learning</a>
              </h3>
              <p>
                Flashcards, Learn and Test can be used to practise active recall
                helping you to retain information for longer. Flashcards
                available on the go are single handedly getting me through
                university.
              </p>
              <a href="/" className="blog-btn mt-3">
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Landing;
