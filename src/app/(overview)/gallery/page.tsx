'use client'
import React, { FC, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import Breadcrumb from "@/src/components/breadcrumb/Breadcrumb";
import gallaryData from "@/src/data/gallaryData.json";


interface GalleryItem {
  id: number;
  small_img: string;
  full_screen_img: string;
  category: string;
  categorySlug: string;
}

function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>(gallaryData);
  const [CategoryActiveSlug, setCategoryActiveSlug] = useState<string | null>(null);

  const [isOpenimg, setOpenimg] = useState<{ openingState: boolean; openingIndex: number }>({
    openingState: false,
    openingIndex: 0,
  });

  const filterItem = (catagoryItem: string) => {
    setCategoryActiveSlug(catagoryItem);
    const updateItems = gallaryData.filter((curentElemet: GalleryItem) => {
      return curentElemet.categorySlug === catagoryItem;
    });
    setItems(updateItems);
  };

  const setAllItems = (allItems: string) => {
    setCategoryActiveSlug(allItems);
    return setItems(gallaryData);
  };

  const categoryCard = new Map(gallaryData.map((categoryData: GalleryItem) => [
    categoryData.category,
    categoryData.categorySlug,
  ]),
  );

  return (
    <>
      <Breadcrumb pageName="Gallery" pageTitle="Gallery" />
      <div className="gallery-pages pt-120 mb-120">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 mb--70 d-flex justify-content-center">
              <div className="filters filter-button-group">
                <ul className="d-flex justify-content-center flex-wrap">
                  <li
                    onClick={() => setAllItems("all")}
                    className={
                      CategoryActiveSlug == "all" || CategoryActiveSlug == null
                        ? "active"
                        : ""
                    }
                    data-filter="*"
                  >
                    All
                  </li>
                  {[categoryCard].map((key) => {
                    return (
                      <li
                        key={key[1]}
                        onClick={() => filterItem(`${key[1]}`)}
                        className={key[1] == CategoryActiveSlug ? "active" : ""}
                      >
                        {key[0]}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row grid g-4">
                {items.map((element, index) => {
                  return (
                    <div
                      key={element.id}
                      className="col-lg-4 col-md-6 col-sm-12"
                    >
                      <div className="gallery2-img">
                        <div className="gallery-img">
                          <img
                            className="img-fluid"
                            src={element.small_img}
                            alt=""
                          />
                          <div className="overlay">
                            <div className="zoom-icon">
                              <i
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  setOpenimg({
                                    openingState: true,
                                    openingIndex: index,
                                  })
                                }
                                className="bi bi-zoom-in"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Lightbox
        className="img-fluid"
        open={isOpenimg.openingState}
        plugins={[Fullscreen]}
        index={isOpenimg.openingIndex}
        close={() => setOpenimg({ openingState: false, openingIndex: 0 })}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .9)" } }}
        slides={items.map(function (elem) {
          return { src: elem.full_screen_img };
        })}
      />
    </>
  );
}

export default Gallery;