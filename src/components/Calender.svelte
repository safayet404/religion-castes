<script lang="ts">
    let day: number | "" = "";
    let month: number | "" = new Date().getMonth() + 1;
    let year: number | "" = new Date().getFullYear();
    let age: string = "";
    let errorMessage: string = "";

    const minAge = 12;

    let isValid = true;

    function isLeapYear(year: number): boolean {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function getDaysInMonth(month: number, year: number): number {
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
            case 4:
            case 6:
            case 9:
            case 11:
                return 30;
            case 2:
                return isLeapYear(year) ? 29 : 28;
            default:
                return 0;
        }
    }

    $: {
        errorMessage = "";
        age = "";
        isValid = true;

        if (month && day && year) {
            const monthNum = Number(month);
            const dayNum = Number(day);
            const yearNum = Number(year);

            if (monthNum < 1 || monthNum > 12) {
                errorMessage = "Invalid month.";
                isValid = false;
            } else {
                const daysInMonth = getDaysInMonth(monthNum, yearNum);
                if (dayNum < 1 || dayNum > daysInMonth) {
                    errorMessage = `Invalid day for the selected month. ${daysInMonth} days in month ${monthNum}.`;
                    isValid = false;
                }
            }

            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            const currentDay = currentDate.getDate();

            let calculatedYear = currentYear - yearNum;
            let calculatedMonth = currentMonth - monthNum;
            let calculatedDay = currentDay - dayNum;

            if (calculatedDay < 0) {
                calculatedMonth--;
                calculatedDay += getDaysInMonth(currentMonth, currentYear);
            }

            if (calculatedMonth < 0) {
                calculatedYear--;
                calculatedMonth += 12;
            }

            if (calculatedYear < minAge) {
                errorMessage = `Age must be at least ${minAge} years.`;
                isValid = false;
            } else {
                age = `${calculatedYear} years, ${calculatedMonth} months, ${calculatedDay} days`;
            }
        }
    }

    function getMonths() {
        return [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
    }

    function getDays() {
        return Array.from({ length: 31 }, (_, i) => i + 1);
    }

    function getYears() {
        const currentYear = new Date().getFullYear();
        return Array.from(
            { length: currentYear - 1905 + 1 },
            (_, i) => 1905 + i,
        );
    }
</script>

<div class="container mx-auto mt-10 p-5 sm:p-2">
    <h1 class="font-bold text-lg md:text-3xl text-black mb-10">
        Date of Birth (Age minimum 12 years)
    </h1>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div class="flex flex-col">
            <label for="day" class="font-semibold text-gray-700">Day:</label>
            <select
                id="day"
                bind:value={day}
                class="mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <option value="" disabled>Select Day</option>
                {#each getDays() as dayOption}
                    <option value={dayOption}>{dayOption}</option>
                {/each}
            </select>
        </div>

        <div class="flex flex-col">
            <label for="month" class="font-semibold text-gray-700">Month:</label
            >
            <select
                id="month"
                bind:value={month}
                class="mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <option value="" disabled>Select Month</option>
                {#each getMonths() as monthName, index}
                    <option value={index + 1}>{monthName}</option>
                {/each}
            </select>
        </div>

        <div class="flex flex-col">
            <label for="year" class="font-semibold text-gray-700">Year:</label>
            <select
                id="year"
                bind:value={year}
                class="mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <option value="" disabled>Select Year</option>
                {#each getYears() as yearOption}
                    <option value={yearOption}>{yearOption}</option>
                {/each}
            </select>
        </div>
    </div>

    {#if errorMessage}
        <div
            class="text-[#D91B42] text-base md:text-xl mt-5 border border-red-800 p-1 w-[50%] text-center mx-auto bg-[#F8D7DA]"
        >
            {errorMessage}
        </div>
    {/if}

    <div class="mt-10">
        <p>Day : {day}</p>
        <p>Month : {month}</p>
        <p>Year : {year}</p>

        {#if !age}
            <p class="text-black font-bold text-xl md:text-3xl mx-auto mt-10">
                Age :
            </p>
        {/if}
    </div>

    {#if isValid && age}
        <div class="text-black font-bold text-xl md:text-3xl mx-auto mt-10">
            Age: {age}
        </div>
    {/if}
</div>
