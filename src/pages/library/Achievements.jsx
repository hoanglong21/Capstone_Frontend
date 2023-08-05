import React from "react";
import nightowl from "../../assets/achievements/NightOwl.svg";
import activeLearner from "../../assets/achievements/activeLearner.svg";
import committedLearner from "../../assets/achievements/committedLearner.svg";
import createfirstset from "../../assets/achievements/CreatedFirstSet.svg";
import studywithtest from "../../assets/achievements/StudiedWithTest.svg";
import earkyBird from "../../assets/achievements/EarlyBird.svg";
import streak from "../../assets/achievements/streak.svg";
import setStudied from "../../assets/achievements/badge-SetsStudied.svg";
import member from "../../assets/achievements/badge-Week.svg";
import "../../assets/styles/achievement.css";

function Achievements() {  
  return (
    <div>
      <div className="row gx-3 mb-3 mt-3">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-2 d-flex flex-row align-items-center justify-content-between">
              <h5 className="m-0 fw-bold text-uppercase text-secondary">
                Award
              </h5>
            </div>
            <div className="card-body achievement">
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={nightowl} alt="nightowl" className="img1" />
                  </div>
                  Night owl
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={activeLearner} alt="nightowl" className="img1" />
                  </div>
                  Active learner
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img
                      src={committedLearner}
                      alt="nightowl"
                      className="img1"
                    />
                  </div>
                  Committed learner
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={createfirstset} alt="nightowl" className="img1" />
                  </div>
                  Set builder
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={studywithtest} alt="nightowl" className="img1" />
                  </div>
                  Test acer
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={earkyBird} alt="nightowl" className="img1" />
                  </div>
                  Early bird
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row gx-3 mb-3 mt-3">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-2 d-flex flex-row align-items-center justify-content-between">
              <h5 className="m-0 fw-bold text-uppercase text-secondary">
                Streak
              </h5>
            </div>
            <div className="card-body achievement">
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">3</span>
                  </div>
                  3-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">5</span>
                  </div>
                  5-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">7</span>
                  </div>
                  7-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">10</span>
                  </div>
                  10-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">20</span>
                  </div>
                  20-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">30</span>
                  </div>
                  30-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">45</span>
                  </div>
                  45-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">60</span>
                  </div>
                  60-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">70</span>
                  </div>
                  70-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">80</span>
                  </div>
                  80-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">100</span>
                  </div>
                  100-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">150</span>
                  </div>
                  150-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">200</span>
                  </div>
                  200-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">250</span>
                  </div>
                  250-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">300</span>
                  </div>
                  300-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">350</span>
                  </div>
                  350-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">400</span>
                  </div>
                  400-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">450</span>
                  </div>
                  450-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">500</span>
                  </div>
                  500-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">600</span>
                  </div>
                  600-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">700</span>
                  </div>
                  700-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">800</span>
                  </div>
                  800-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">900</span>
                  </div>
                  900-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={streak} alt="nightowl" className="img1" />
                    <span className="forspan">1k</span>
                  </div>
                  1000-day streak
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>           
            </div>
          </div>
        </div>
      </div>
      <div className="row gx-3 mb-3 mt-3">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-2 d-flex flex-row align-items-center justify-content-between">
              <h5 className="m-0 fw-bold text-uppercase text-secondary">
                Studied
              </h5>
            </div>
            <div className="card-body achievement">
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={setStudied} alt="nightowl" className="img1" />
                    <span className="forspan-set">1</span>
                  </div>
                  Studied first set
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={setStudied} alt="nightowl" className="img1" />
                    <span className="forspan-set">3</span>
                  </div>
                  3 sets studied
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={setStudied} alt="nightowl" className="img1" />
                    <span className="forspan-set">5</span>
                  </div>
                  5 sets studied
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={setStudied} alt="nightowl" className="img1" />
                    <span className="forspan-set">7</span>
                  </div>
                  7 sets studied
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={setStudied} alt="nightowl" className="img1" />
                    <span className="forspan-set">10</span>
                  </div>
                  10 sets studied
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={setStudied} alt="nightowl" className="img1" />
                    <span className="forspan-set">25</span>
                  </div>
                  25 sets studied
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={setStudied} alt="nightowl" className="img1" />
                    <span className="forspan-set">50</span>
                  </div>
                  50 sets studied
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={setStudied} alt="nightowl" className="img1" />
                    <span className="forspan-set">75</span>
                  </div>
                  75 sets studied
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={setStudied} alt="nightowl" className="img1" />
                    <span className="forspan-set">100</span>
                  </div>
                  100 sets studied
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={setStudied} alt="nightowl" className="img1" />
                    <span className="forspan-set">150</span>
                  </div>
                  150 sets studied
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={setStudied} alt="nightowl" className="img1" />
                    <span className="forspan-set">250</span>
                  </div>
                  250 sets studied
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={setStudied} alt="nightowl" className="img1" />
                    <span className="forspan-set">300</span>
                  </div>
                  300 sets studied
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={setStudied} alt="nightowl" className="img1" />
                    <span className="forspan-set">350</span>
                  </div>
                  350 sets studied
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={setStudied} alt="nightowl" className="img1" />
                    <span className="forspan-set">400</span>
                  </div>
                  400 sets studied
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={setStudied} alt="nightowl" className="img1" />
                    <span className="forspan-set">450</span>
                  </div>
                  450 sets studied
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={setStudied} alt="nightowl" className="img1" />
                    <span className="forspan-set">500</span>
                  </div>
                  500 sets studied
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={setStudied} alt="nightowl" className="img1" />
                    <span className="forspan-set">600</span>
                  </div>
                  600 sets studied
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={setStudied} alt="nightowl" className="img1" />
                    <span className="forspan-set">700</span>
                  </div>
                  700 sets studied
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={setStudied} alt="nightowl" className="img1" />
                    <span className="forspan-set">800</span>
                  </div>
                  800 sets studied
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={setStudied} alt="nightowl" className="img1" />
                    <span className="forspan-set">900</span>
                  </div>
                  900 sets studied
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={setStudied} alt="nightowl" className="img1" />
                    <span className="forspan-set">1k</span>
                  </div>
                  1000 sets studied
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row gx-3 mb-3 mt-3">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-2 d-flex flex-row align-items-center justify-content-between">
              <h5 className="m-0 fw-bold text-uppercase text-secondary">
                Member
              </h5>
            </div>
            <div className="card-body achievement">
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={member} alt="nightowl" className="img1" />
                    <span className="forspan-mem">1</span>
                  </div>
                  First member
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={member} alt="nightowl" className="img1" />
                    <span className="forspan-mem">5</span>
                  </div>
                  5 members
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={member} alt="nightowl" className="img1" />
                    <span className="forspan-mem">10</span>
                  </div>
                  10 members
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={member} alt="nightowl" className="img1" />
                    <span className="forspan-mem">20</span>
                  </div>
                  20 members
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={member} alt="nightowl" className="img1" />
                    <span className="forspan-mem">50</span>
                  </div>
                  50 members
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={member} alt="nightowl" className="img1" />
                    <span className="forspan-mem">100</span>
                  </div>
                  100 members
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={member} alt="nightowl" className="img1" />
                    <span className="forspan-mem">200</span>
                  </div>
                200 members
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={member} alt="nightowl" className="img1" />
                    <span className="forspan-mem">500</span>
                  </div>
                  500 members
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
              <div className="achievement-streak">
                <div className="streak-ct">
                  <div className="streak-img">
                    <img src={member} alt="nightowl" className="img1" />
                    <span className="forspan-mem">1000</span>
                  </div>
                  1000 members
                  <span className="streak-date">24 tháng 3, 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Achievements;
