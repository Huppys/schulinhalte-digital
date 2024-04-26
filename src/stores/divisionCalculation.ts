import { defineStore } from 'pinia';
import { computed } from 'vue';
import type { ComputedRef } from 'vue';

interface LocalStorageMathe {
   division: {
      'upTo100': {
         todos: Array<[number, number]>
      }
   };
}

export const useDivisionCalculationStore = defineStore('divisionCalculation', () => {

   const localStorageMatheKey: string = 'Mathe';
   let localStorageMathe: string | null = localStorage.getItem(localStorageMatheKey);

   const parseLocalStorage: ComputedRef<LocalStorageMathe> = computed(() => {

      if ( !localStorageMathe ) {
         localStorageMathe = JSON.stringify({
            division: {
               'upTo100': {
                  todos: []
               }
            }
         });
         localStorage.setItem(localStorageMatheKey, localStorageMathe);
      }

      return JSON.parse(localStorageMathe) as LocalStorageMathe;
   });

   const todos: ComputedRef<Array<[number, number]>> = computed(() => {
      return parseLocalStorage.value.division['upTo100'].todos;
   });

   function addTodo(factors: [number, number]) {
      todos.value?.push(factors);
      saveTodosToLocalStorage();
   }

   function saveTodosToLocalStorage(): void {
      const testObject = {...parseLocalStorage.value}
      testObject.division['upTo100'].todos = todos.value;
      localStorage.setItem(localStorageMatheKey, JSON.stringify(testObject));
   }

   function hasTodos(count: number): boolean {
      return todos.value?.length ? todos.value?.length >= count : false;
   }

   function getNextTodos(count: number): Array<[number, number]> {
      return todos.value.splice(0, count);
   }

   return {
      addTodo,
      hasTodos,
      saveTodosToLocalStorage,
      getNextTodos
   };
});