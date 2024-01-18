<script setup>
</script>

<template>
  <div id="app">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss">
body, button, input, textarea {
  font-family: 'Avenir', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  margin: auto;
  width: 400px;
  margin-top: 5%;
  &.legato {
    transition: all 0.2s ease-in-out;
  }
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-input {
  flex: 1;
  font-size: 1.05rem;
  padding: 1rem;
  height: 46px; /* Making it same height as button */
  border: 1px solid #ccc;
  margin-right: 1rem; /* Margin between search box and button */
  border-radius: 5px; /* Slightly rounded corners */
}

.search-button, button {
  padding: 0.5rem 1.5rem;
  background-color: #4CAF75; /* Green color */
  border: none;
  cursor: pointer;
  color: white;
  font-size: 1.05rem;
  height: 46px; /* Making it same height as input */
  border-radius: 5px; /* Slightly rounded corners */
  transition: all 0.1s ease-in-out;
  &.large {
    font-size: 1.05rem;
    padding: 0.6rem 1.5rem;
    height: auto;
  }
  &:hover {
    background-color: #45a049;
  }
  &:focus {
    outline: 1px solid rgba(0, 0, 0, 0.3);
  }
  &:active {
    transform: scale(1.05);
    background-color: #3e8e41 !important;
  }
}
button {
  padding: 0.5rem 0.25rem;
  transition: all 0.1s ease-in-out;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: #ccc;
  }
}

.button-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.fixie {
  width: 22%;
  line-height: 1.1;
  height: 4rem;
}

.search-button:hover {
  background-color: #45a049;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.none-enter-active,
.none-leave-active {
  transition: none;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.user {
  margin-bottom: 1rem;
  h3 {
    margin-bottom: 0.2em;
  }
  p {
    line-height: 1;
    margin-bottom: 0.4rem;
    margin-top: 0;
    span.left {
      width: 25%;
      display: inline-block;
    }
    span.right {
      font-weight: bold;
    }
  }
}
</style>
