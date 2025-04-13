import React, { useState } from "react";
import '../Css/Stylish.css';


function AgeCalculator() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("ar"); // "ar" = العربية, "en" = الإنجليزية

  const translations = {
    ar: {
      title: "حساب العمر",
      placeholderDay: "يوم",
      placeholderMonth: "شهر",
      placeholderYear: "سنة",
      button: "احسب",
      error: "الرجاء إدخال تاريخ صالح",
      birthDay: " وُلدت يوم:",
      age: "سنة",
      weeks: "أسابيع",
      days: "أيام",
      months: "أشهر",
      switchLang: "English",
    },
    en: {
      title: "Age Calculator",
      placeholderDay: "DD",
      placeholderMonth: "MM",
      placeholderYear: "YYYY",
      button: "Calculate",
      error: "Please enter a valid date",
      birthDay: "born on:",
      age: "Age",
      weeks: "Weeks",
      days: "Days",
      months: "Months",
      switchLang: "العربية",
    },
  };

  const calculateAge = (day, month, year) => {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }

    if (months < 0) {
      months += 12;
      years--;
    }

    const totalMonths = years * 12 + months;
    const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);

    return { years, months, days, totalMonths, totalDays, totalWeeks };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setAge(null);

    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    if (
      isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum) ||
      dayNum < 1 || dayNum > 31 ||
      monthNum < 1 || monthNum > 12 ||
      yearNum < 1000 || yearNum > new Date().getFullYear()
    ) {
      setError(translations[language].error);
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const { years, months, days, totalMonths, totalDays, totalWeeks } = calculateAge(dayNum, monthNum, yearNum);
      setAge({ years, months, days, totalMonths, totalDays, totalWeeks });
    } catch (e) {
      setError("❌ Error calculating age. Please check the data.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="container col-lg-6 col-sm-8 text-center d-flex justify-content-center align-items-center p-3" style={{ minHeight: '100vh' }}>
      <div className="border p-3 main shadow-lg">
        <button onClick={() => setLanguage(language === "ar" ? "en" : "ar")} className="togle-lun p-2 fw-bold d-flex  mb-3">
          {translations[language].switchLang}
        </button>
        {/* زر تغيير اللغة */}

        <h1>{translations[language].title}</h1>

        <form onSubmit={handleSubmit} className="row gap-2 mt-4 m-auto d-flex justify-content-center">
          <input
            className="form-custom fw-bold col-3 p-2"
            type="number"
            placeholder={translations[language].placeholderDay}
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
          <input
            className="form-custom fw-bold col-3"
            type="number"
            placeholder={translations[language].placeholderMonth}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          <input
            className="form-custom fw-bold col-4"
            type="number"
            placeholder={translations[language].placeholderYear}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </form>

        <button type="submit" onClick={handleSubmit} className="btn-custom mt-3 p-2 col-4 fw-bold">
          {translations[language].button}
        </button>

        {/* رسالة الخطأ */}
        {error && <p className="text-danger fw-bold mt-3">{error}</p>}

        {/* نتيجة الحساب */}
        {age && (
          <div className="mt-4 content p-4">
            {/* يوم الميلاد */}
              <h5 className="text-day fw-bold">
                {translations[language].birthDay}{" "}
                {new Date(year, month - 1, day).toLocaleDateString(language === "ar" ? 'ar-EG' : 'en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h5>

            {/* تفاصيل العمر */}
            <div className="data row gap-2 fw-bold align-items-center mt-3 ">
              <p className="age-text col p-2 m-0 dd">
                {age.years}  {translations[language].age} 
                ,{age.months} {translations[language].months}
                ,{age.days} {translations[language].days}
              </p>
            </div>

            <div className="row gap-2 mt-3 fw-bold align-items-center">
              <p className="age-detils col p-2 m-0">{translations[language].weeks}: {age.totalWeeks}</p>
              <p className="age-detils col p-2 m-0">{translations[language].days}: {age.totalDays}</p>
              <p className="age-detils col p-2 m-0">{translations[language].months}: {age.totalMonths}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AgeCalculator;
