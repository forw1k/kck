<template>
  <div class="my-header">Тестовое задание</div>
</template>

<script>
export default {
  name: 'my-header',
};
</script>

<style lang="scss">
$white: #ffffff;

.my-header {
  width: 100%;
  height: 26rem;
  padding: 0 11rem;
  display: flex;
  align-items: center;
  background: linear-gradient(
    267.21deg,
    #900793 0.16%,
    rgba(134, 4, 137, 0.785707) 0.16%,
    rgba(159, 12, 162, 0.762269) 43.22%,
    rgba(5, 1, 190, 0.734375) 98.12%,
    rgba(0, 28, 126, 0.619792) 100.15%,
    rgba(6, 77, 142, 0.447917) 102.03%,
    rgba(1, 0, 60, 0) 102.73%
  );
  color: $white;
  font-size: 3.6rem;
  font-weight: bold;
  line-height: 1.17;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
