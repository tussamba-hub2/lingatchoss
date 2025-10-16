import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../../../supabaseClient";

const appLogo = "./assets/images/app-logo.png";

export default function Institutions() {
  const { t } = useTranslation();
  const carrouselRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [institutions, setInstitutions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user_location");
    if (stored) {
      setUserLocation(JSON.parse(stored));
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
            setUserLocation(coords);
            localStorage.setItem("user_location", JSON.stringify(coords));
          },
          () => setUserLocation(null)
        );
      } else {
        setUserLocation(null);
      }
    }
  }, []);

  useEffect(() => {
    const fetchNearbyInstitutions = async () => {
      if (!userLocation) {
        console.error("User location is not available.");
        return;
      }

      let { data: users, error: usersError } = await supabase
        .from("users")
        .select(`id, name, location, logo_url, sector_id`)
        .eq("role", "institution");

      if (usersError) {
        console.error("Error fetching institutions:", usersError);
        return;
      }

      const sectorIds = users.map((user) => user.sector_id).filter(Boolean);
      const currentLanguage = localStorage.getItem("i18nextLng") || "en";

      let { data: sectorTranslations, error: sectorsError } = await supabase
        .from("sector_translations")
        .select(`sector_id, name, language_code`)
        .in("sector_id", sectorIds)
        .eq("language_code", currentLanguage);

      if (sectorsError) {
        console.error("Error fetching sector translations:", sectorsError);
        return;
      }

      const sectorMap = sectorTranslations.reduce((map, sector) => {
        map[sector.sector_id] = sector.name;
        return map;
      }, {});

      const institutionsWithDistance = users
        .map((u) => {
          if (!u.location) {
            console.warn(`User ${u.id} does not have a valid location.`);
            return null;
          }
          const match = u.location.match(
            /Lat:\s*(-?\d+\.\d+),\s*Lng:\s*(-?\d+\.\d+)/
          );
          if (!match) {
            console.warn(`User ${u.id} location format is invalid.`);
            return null;
          }
          const lat = parseFloat(match[1]);
          const lng = parseFloat(match[2]);
          const dist = getDistanceFromLatLonInKm(
            userLocation.lat,
            userLocation.lng,
            lat,
            lng
          );

          const avatarUrl = u.logo_url || null;
          const sectorName = sectorMap[u.sector_id] || "Unknown Sector";

          return {
            id: u.id,
            name: u.name,
            lat,
            lng,
            dist,
            avatarUrl,
            sectorName,
          };
        })
        .filter((u) => {
          if (!u) return false;
          if (u.dist > 70) {
            console.info(`User ${u.id} is too far: ${u.dist} km.`);
            return false;
          }
          return true;
        })
        .sort((a, b) => a.dist - b.dist);

      if (institutionsWithDistance.length === 0) {
        console.info("No institutions found within the distance limit.");
      }

      setInstitutions(institutionsWithDistance);
    };

    fetchNearbyInstitutions();

    const handleLanguageChange = () => {
      fetchNearbyInstitutions();
    };

    window.addEventListener("languageChanged", handleLanguageChange);

    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange);
    };
  }, [userLocation]);

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const handleScroll = (direction) => {
    if (carrouselRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      carrouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleMouseDown = (e) => {
    if (carrouselRef.current) {
      carrouselRef.current.isDragging = true;
      carrouselRef.current.startX = e.pageX - carrouselRef.current.offsetLeft;
    }
  };

  const handleMouseMove = (e) => {
    if (carrouselRef.current?.isDragging) {
      e.preventDefault();
      const x = e.pageX - carrouselRef.current.offsetLeft;
      const walk = (x - carrouselRef.current.startX) * 2; // Adjust sensitivity
      carrouselRef.current.scrollLeft -= walk;
    }
  };

  const handleMouseUp = () => {
    if (carrouselRef.current) {
      carrouselRef.current.isDragging = false;
    }
  };

  const handleInstituitionClick = (id) => {
    console.debug("Instituition clicked, ID:", id); // Debug message
    navigate(`/instituition/${id}`);
  };

  return (
    <div className="institutions-container padding-inside mt-100">
      <div className="d-flex column g-32px w-full">
        <div className="d-flex items-center justify-between g-20px">
          <h3 className="size-20 extra-bold">{t("instituitions_near_you")}</h3>
          <NavLink to="https://wa.me/244933522999" target="_blank" className="btn btn-bg">
            <span className="nowrap">Solicitar adesão</span>
          </NavLink>
        </div>
        {institutions.length > 0 ? (
          <div className="d-flex w-full">
            <div
              className="grid-inst w-full"
              ref={carrouselRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {institutions.map((inst) => (
                <div
                  key={inst.id}
                  className="enter-item"
                  onClick={() => handleInstituitionClick(inst.id)}
                >
                  <NavLink className="d-flex column g-12px">
                    <img src={inst.avatarUrl || appLogo} alt={inst.name} />
                    <div className="d-flex column g-4px">
                      <h4 className="size-16 medium">{inst.name}</h4>
                      <span className="size-12 color-opac">
                        {inst.sectorName}
                      </span>
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no-institutions-message">
            <p>{t("no_institutions_found")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
