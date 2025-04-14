// Fonction pour formater la date ISO en format lisible
export const formatDate = (dateInput: string | Date | undefined, locale: string = "fr-FR") => {
    if (!dateInput) return "";
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    return date.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };