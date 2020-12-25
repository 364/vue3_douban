<template>
  <div class="error">
    <div class="bg"></div>
    <div class="box">
      <div class="box-left">
        <div class="box-left-text">
          <strong>404.</strong>
          <em>That's an error.</em>
        </div>
        <div class="box-left-text">
          {{ $store.state.errMsg }} <br />
          Failed to load, please refresh again
        </div>
      </div>
      <div class="box-right">
        <img src="@/assets/images/404-2.png" alt="404" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "error",
};
</script>
<style lang="less" scoped>
.error {
  width: 100vw;
  height: 100vh;
  .bg {
    width: 100%;
    height: 50%;
    background-color: @bgColor;
  }
  .box {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    width: 80%;
    max-width: 800px;
    padding: 10rem 2rem 2rem;
    background-color: white;
    border-radius: 5px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 3px;
      background-color: fade(@primaryColor, 60%);
      top: 0;
      left: 0;
    }
    &-left {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      margin: 0 2rem;
      &-text {
        padding: 2rem 0;
        font-size: 1rem;
        color: #999;
        line-height: 1.5;
        strong {
          font-weight: 600;
          margin-right: 10px;
          color: @primaryColor;
          font-size: 2rem;
        }
        em {
          font-size: 1.2rem;
          color: #555;
        }
      }
    }
    &-right {
      width: 40%;
      img {
        width: 100%;
      }
    }
  }
}
</style>
