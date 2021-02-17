<template>
  <div id="app" class="flex flex-col items-center antialiased">
    <h1
      class="text-6xl sm:font-semibold sm:text-7xl text-yellow-500 lg:text-8xl flex tracking-wide fontFamily"
    >
      Task List
    </h1>
    <div class="flex mt-2 sm:mt-4 lg:mt-8">
      <form @submit.prevent="addTask()">
        <input
          v-model="newTask"
          type="text"
          name="newTask"
          id="newTask"
          class="mr-2 px-2 sm:mr-6 lg:mr-10 md:px-4 text-xl sm:text-2xl lg:text-3xl sm:p-1 focus:outline-none bg-yellow-300 focus:bg-yellow-400 text-blue-800 placeholder-blue-300"
          style="font-family: 'Montserrat', sans-serif"
          autocomplete="off"
          autofocus
          placeholder="Add Task (Max 50 letters)"
        />
        <button
          type="submit"
          name="button"
          class="text-white sm:text-2xl md:text-3xl lg:text-4xl lg:px-5 px-3 py-1 rounded hover:bg-yellow-200 bg-yellow-500 hover:text-yellow-600 font-semibold focus:outline-none focus:shadow-outline transition-all duration-500 fontFamily"
        >
          Add
        </button>
      </form>
    </div>
    <div class="flex">
      <button
        @click="allDone"
        class="mt-4 bg-yellow-500 tracking-wide sm:mt-8 mr-4 sm:text-2xl md:text-3xl lg:px-4 md:mr-6 flex items-center rounded px-2 sm:px-3 py-2 text-white focus:outline-none focus:shadow-outline hover:bg-yellow-200 hover:text-yellow-600 transition-all duration-500 fontFamily"
      >
        <svg
          class="h-6 w-6 lg:h-8 lg:w-8 fill-current text-yellow-600 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z"
          />
        </svg>
        All done
      </button>
      <button
        @click="removeAllDone"
        class=" mt-4 sm:mt-8 sm:text-2xl md:text-3xl hover:bg-yellow-200 lg:px-5 bg-yellow-500 rounded sm:px-4 px-2 py-2 text-white focus:outline-none focus:shadow-outline hover:text-yellow-600 transition-all ease-in duration-300 fontFamily"
      >
        Remove done
      </button>
    </div>

    <div class="mt-8">
      <transition-group tag="ul" name="slide-up" appear>
        <li v-for="task in tasks" :key="task.id" class="flex items-center">
          <div
            class="bg-white border-2 sm:mr-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded border-gray-400 w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500"
          >
            <input
              type="checkbox"
              v-model="task.done"
              class="opacity-0 absolute"
            />
            <svg
              class="fill-current w-4 h-4 text-white pointer-events-none"
              :class="{ 'text-yellow-600': task.done }"
              viewBox="0 0 20 20"
            >
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          </div>

          <span
            class="sm:text-2xl md:text-3xl lg:text-4xl mr-2 text-yellow-500 font-semibold sm:mr-4 transition-all duration-700"
            style="font-family: 'Montserrat', sans-serif;"
            :class="{ 'line-through opacity-50': task.done }"
            >{{ task.title }}</span
          >
          <button @click="removeTask(task)" type="button">
            <svg
              class="h-4 w-4 sm:h-5 sm:w-5 lg:w-6 lg:h-6 fill-current text-yellow-500 hover:text-yellow-600 focus:outline-none focus:shadow-outline "
              style="transition: all 0.3s ease"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zM11.4 10l2.83-2.83-1.41-1.41L10 8.59 7.17 5.76 5.76 7.17 8.59 10l-2.83 2.83 1.41 1.41L10 11.41l2.83 2.83 1.41-1.41L11.41 10z"
              />
            </svg>
          </button>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      newTask: "",
      tasks: [],
      inputError: false
    };
  },
  methods: {
    addTask() {
      if (this.newTask.length < 2 || this.newTask.length > 50) {
        this.inputError = true;
      } else {
        this.tasks.push({
          id: Date.now(),
          title: this.newTask,
          done: false
        });
        this.newTask = "";
        this.inputError = false;
      }
    },
    removeTask(task) {
      const taskIndex = this.tasks.indexOf(task);
      this.tasks.splice(taskIndex, 1);
    },
    allDone() {
      this.tasks.forEach(task => {
        task.done = true;
      });
    },
    removeAllDone() {
      let newArray = this.tasks.filter(task => !task.done);
      this.tasks = newArray;
    }
  },
  watch: {
    tasks: {
      handler() {
        localStorage.tasks = JSON.stringify(this.tasks);
      }
    },
    deep: true
  },
  mounted() {
    if (localStorage.tasks) {
      this.tasks = JSON.parse(localStorage.tasks);
    }
  }
};
console.log(
  "Hello! This is a practice App built to learn how to develop using Vue + Tailwind and to try Tailwind's responsive utility classes. The App displays properly across different breakpoints. Try changing the window size to see how it adapts! - Ariel"
);
</script>

<style src="./css/tailwind.css"></style>
