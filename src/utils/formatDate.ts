export const converDate = (date: string | undefined, locale = "es-ES") => {
        const recibeDate = date;
        const splitDate = recibeDate?.split("T");

        const options: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "UTC",
        };

        const formattedDate = new Intl.DateTimeFormat(locale, options).format(
            new Date(splitDate?.[0] ?? "")
        );
        return formattedDate;
    };
