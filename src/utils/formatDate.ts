export const converDate = (date: string | undefined) => {
        const recibeDate = date;
        const splitDate: any = recibeDate?.split("T");

        const options: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "UTC",
        };

        const formattedDate = new Intl.DateTimeFormat("es-ES", options).format(
            new Date(splitDate[0])
        );
        return formattedDate;
    };