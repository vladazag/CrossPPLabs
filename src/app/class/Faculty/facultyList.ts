import { Faculty } from "./faculty";
export class facultyList {
    faculties: Faculty[] = [];

    addFaculty(f: Faculty) {
        this.faculties.push(f);
    }

    // Групування за універами
    group() {
        const grouped: { [key: string]: Faculty[] } = {};

        this.faculties.forEach(faculty => {
            const university = faculty.nameUniversity;
            if (!grouped[university]) {
                grouped[university] = [];
            }

            grouped[university].push(faculty);
        });

        return grouped;
    }

    // К-ть факультетів в універі
    getFacultyCountByUni() {
        const grouped = this.group();
        const result: { name: string, count: number }[] = [];

        for (const university in grouped) {
            result.push({
                name: university,
                count: grouped[university].length
            });
        }

        return result;
    }
}