import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import s from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config";
import { TVSHowDetail } from "./Component/TVShowDetail/TVShowDetail";
import { Logo } from "./Component/Logo/Logo";
import logoImg from "./Assets/Images/logo.png";
import { TVShowListItem } from "./Component/TVShowListItem/TVShowListItem";
import { TVShowList } from "./Component/TVShowList/TVShowList";
import { SearchBar } from "./Component/Searchbar/SearchBar";
export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendationList, setRecommendationList] = useState([]);
  async function fetchPopulars() {
    try {
      const popularTVShowList = await TVShowAPI.fetchPopulars();
      if (popularTVShowList.length > 0) {
        setCurrentTVShow(popularTVShowList[0]);
      }
    } catch (error) {
      alert("Something went wrong when fetching popular TV Show");
    }
  }
  async function fetchRecommendations(tvShowId) {
    try {
      const recommendationListResp = await TVShowAPI.fetchRecommendations(
        tvShowId
      );
      if (recommendationListResp.length > 0) {
        setRecommendationList(recommendationListResp.slice(0, 10));
      }
    } catch (error) {
      alert("...");
    }
  }

  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]);

  console.log(recommendationList);

  function updateCurrentTVShow(tvShow) {
    setCurrentTVShow(tvShow);
  }
  async function fetchByTitle(title) {
    try {
      const searchResponse = await TVShowAPI.fetchByTitle(title);
      if (searchResponse.length > 0) {
        setCurrentTVShow(searchResponse[0]);
      }
    } catch (error) {
      alert("Something went wrong on search the TV Show");
    }
  }
  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
      url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo
              image={logoImg}
              title={"Watowatch"}
              subtitle={"Find a show you may Like"}
            />
          </div>
          <div className="col-md-12 col-lg-4">
            <SearchBar onSubmit={fetchByTitle} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTVShow && <TVSHowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommended_tv_show}>
        {currentTVShow && (
          <TVShowList
            onClickItem={updateCurrentTVShow}
            tvShowList={recommendationList}
          />
        )}
      </div>
    </div>
  );
}
