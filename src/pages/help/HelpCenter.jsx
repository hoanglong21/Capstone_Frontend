import { useNavigate } from 'react-router-dom'

import '../../assets/styles/Helpcenter.css'

function HelpCenter() {
    const navigate = useNavigate()
    return (
        <div className="hkb__main">
            <div className="ht-container">
                <h2 className="site-header__title">Hi, How can we help you?</h2>

                <form className="hkb-site-search">
                    <label className="hkb-screen-reader-text" for="hkb-search">
                        Search For
                    </label>
                    <input
                        className="hkb-site-search__field"
                        type="text"
                        placeholder="Search help center..."
                    />
                    <button className="hkb-site-search__button" type="submit">
                        <span>Search</span>
                    </button>
                </form>
            </div>
            <div className="ht-container1">
                <div className="ht-page__content">
                    <h2 className="hkb-archive__title">Help Topics</h2>

                    <ul className="hkb-archive  hkb-archive--2cols">
                        <li>
                            <div className="hkb-category  hkb-category--withdesc hkb-category--style7 hkb-category--withicon hkb-category--4">
                                <a className="hkb-category__link" href="/">
                                    <div className="hkb-category__iconwrap">
                                        <img
                                            src="https://demo.herothemes.com/knowall/wp-content/uploads/sites/23/2016/03/17-1.png"
                                            className="hkb-category__icon lazyloading"
                                            alt=""
                                        />
                                    </div>

                                    <div className="hkb-category__content">
                                        <h2 className="hkb-category__title">
                                            My Account{' '}
                                        </h2>

                                        <div className="hkb-category__description">
                                            How to manage your account and it's
                                            features.
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="hkb-category  hkb-category--withdesc hkb-category--style7 hkb-category--withicon hkb-category--3">
                                <a className="hkb-category__link" href="/">
                                    <div className="hkb-category__iconwrap">
                                        <img
                                            src="https://demo.herothemes.com/knowall/wp-content/uploads/sites/23/2016/03/04-1.png"
                                            className="hkb-category__icon lazyloading"
                                            alt=""
                                        />
                                    </div>

                                    <div className="hkb-category__content">
                                        <h2 className="hkb-category__title">
                                            Getting Started{' '}
                                        </h2>

                                        <div className="hkb-category__description">
                                            Articles to get you up and running,
                                            quick and easy.
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="hkb-category  hkb-category--withdesc hkb-category--style7 hkb-category--withicon hkb-category--9">
                                <a className="hkb-category__link" href="/">
                                    <div className="hkb-category__iconwrap">
                                        <img
                                            src="https://demo.herothemes.com/knowall/wp-content/uploads/sites/23/2016/03/02-1.png"
                                            className="hkb-category__icon lazyloading"
                                            alt=""
                                        />
                                    </div>

                                    <div className="hkb-category__content">
                                        <h2 className="hkb-category__title">
                                            Copyright &amp; Legal{' '}
                                        </h2>

                                        <div className="hkb-category__description">
                                            Important information about how we
                                            handle your privacy and data.
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="hkb-category  hkb-category--withdesc hkb-category--style7 hkb-category--withicon hkb-category--7">
                                <a className="hkb-category__link" href="/">
                                    <div className="hkb-category__iconwrap">
                                        <img
                                            src="https://demo.herothemes.com/knowall/wp-content/uploads/sites/23/2016/03/13-1.png"
                                            className="hkb-category__icon lazyloading"
                                            alt=""
                                        />
                                    </div>

                                    <div className="hkb-category__content">
                                        <h2 className="hkb-category__title">
                                            Developers{' '}
                                        </h2>

                                        <div className="hkb-category__description">
                                            Developer documentation and
                                            integration features.
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>

                <aside
                    className="sidebar"
                    itemscope=""
                    itemtype="https://schema.org/WPSideBar"
                >
                    <section
                        id="ht-kb-articles-widget-2"
                        className="widget hkb_widget_articles"
                    >
                        <h3 className="widget__title">Popular Articles</h3>
                        <ul>
                            <li className="hkb-widget-article__format-standard">
                                <a className="hkb-widget__entry-title" href="/">
                                    How to Create an Account?
                                </a>
                            </li>

                            <li className="hkb-widget-article__format-standard">
                                <a className="hkb-widget__entry-title" href="/">
                                    How to Join className?
                                </a>
                            </li>

                            <li className="hkb-widget-article__format-standard">
                                <a className="hkb-widget__entry-title" href="/">
                                    What can I learn from joining the
                                    classNameroom?
                                </a>
                            </li>

                            <li className="hkb-widget-article__format-standard">
                                <a className="hkb-widget__entry-title" href="/">
                                    How secure is my account?
                                </a>
                            </li>
                        </ul>
                    </section>
                    <section className="widget hkb_widget_exit">
                        <h3 className="widget__title">
                            Need Support or Feedback?
                        </h3>
                        <div className="hkb_widget_exit__content">
                            Can't find the answer you're looking for? Don't
                            worry we're here to help!
                        </div>
                        <button
                            className="hkb_widget_exit__btn"
                            onClick={() => {
                                navigate('send-feedback')
                            }}
                        >
                            Send Feedback
                        </button>
                    </section>{' '}
                </aside>
            </div>
        </div>
    )
}

export default HelpCenter
