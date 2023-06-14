import { defineStore } from 'pinia';
import { computed } from 'vue';
import type { ComputedRef } from 'vue';

interface LocalStorageMathe {
    reading: {
        wordImagesQuiz: {
            todos: Array<[string, URL, URL]>
        }
    };
}

export const useReadingWordImagesQuizStore = defineStore('readingWordImagesQuiz', () => {

    const localStorageReadingKey: string = 'Lesen';
    let localStorageReading: string | null = localStorage.getItem(localStorageReadingKey);

    const parseLocalStorage: ComputedRef<LocalStorageMathe> = computed(() => {

        if ( !localStorageReading ) {
            localStorageReading = JSON.stringify({
                reading: {
                    wordImagesQuiz: {
                        todos: []
                    }
                }
            });
            localStorage.setItem(localStorageReadingKey, localStorageReading);
        }

        return JSON.parse(localStorageReading) as LocalStorageMathe;
    });

    const todos: ComputedRef<Array<[string, URL, URL]>> = computed(() => {
        return parseLocalStorage.value.reading.wordImagesQuiz.todos;
    });

    function addTodo(wordImagesQuiz: [string, URL, URL]) {
        todos.value?.push(wordImagesQuiz);
        saveTodosToLocalStorage();
    }

    function saveTodosToLocalStorage(): void {
        const testObject = {...parseLocalStorage.value}
        testObject.reading.wordImagesQuiz.todos = todos.value;
        localStorage.setItem(localStorageReadingKey, JSON.stringify(testObject));
    }

    function hasTodos(count: number): boolean {
        return todos.value?.length ? todos.value?.length >= count : false;
    }

    function getNextTodos(count: number): Array<[string, URL, URL]> {
        return todos.value.splice(0, count);
    }

    return {
        addTodo,
        hasTodos,
        saveTodosToLocalStorage,
        getNextTodos
    };
});