import React, { useState } from "react";
import { ChangeLanguage } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";

function Languages() {
  const dispatch = useDispatch();
  const locale = useSelector((state) => state.langReducer).locale;
  const [lang, setLang] = useState(locale);
  const changeLang = () => {
    dispatch(ChangeLanguage(lang == "EN" ? "NL" : "EN"));
    setLang(lang == "EN" ? "NL" : "EN");
  };
  return (
    <ul className="language-menu">
      <li className="language-switcher" onClick={() => changeLang()}>
        <a onClick={(e) => e.preventDefault()}>
          <img src="/assets/images/icon-language.svg" alt="" />
          {lang}
        </a>
      </li>
    </ul>
  );
}

export default Languages;
