"use client";
import useModalStore from "@/app/stores/mainStore";
import React from "react";

export default function LangModal() {
  const { isLangModalOpen, setLangModalOpen } = useModalStore();
  if (!isLangModalOpen) {
    return <></>;
  }
  return (
    <div className="jsx-2835833729 background fade-enter-done">
      <div className="jsx-2835833729 it content">
        <button
          onClick={() => setLangModalOpen(false)}
          className="jsx-f1ed09f139fd0ff4 close"
        />
        <h2 className="jsx-585ea3472e396a52">LINGUE</h2>
        <div className="jsx-b32d58b376010328 list">
          <div className="jsx-3217538729 scroll over top">
            <div className="jsx-3217538729 scrollElements">
              <span className="jsx-b32d58b376010328 langs">
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Azərbaycanca</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Bahasa Indonesia</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Bahasa Melayu</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Català</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Čeština</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Dansk</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Deutsch</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Eesti</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">English</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Español</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Français</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Hrvatski</p>
                </a>
                <a className="jsx-b32d58b376010328 active">
                  <p className="jsx-b32d58b376010328">Italiano</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Latviešu</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Lietuvių</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Magyar</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Nederlands</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Norsk</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Polski</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Português</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Română</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Slovenčina</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Slovenščina</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Suomi</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Tiếng Việt</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Türkçe</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Svenska</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Ελληνικά</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Български език</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Русский</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Српски</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">Українська</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">ქართული</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">עברית</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">العربية</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">فارسی</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">ภาษาไทย</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">日本語</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">中文 (简化字)</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">中文 (臺灣)</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">中文 (香港)</p>
                </a>
                <a className="jsx-b32d58b376010328 ">
                  <p className="jsx-b32d58b376010328">한국어</p>
                </a>
              </span>
            </div>
            <div className="jsx-3217538729 scrollBar">
              <div
                className="jsx-3217538729 scrollTrack"
                style={{ top: 4, height: 30 }}
              />
            </div>
          </div>
        </div>
        <button className="jsx-7a5051b5ea0cbf35 big">CONFERMARE</button>
      </div>
    </div>
  );
}
