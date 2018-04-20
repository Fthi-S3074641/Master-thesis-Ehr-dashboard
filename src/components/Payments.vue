<template>
  <div class="form-inline">
      <label><h5>Enter an account and amount </h5></label>
      <input class="form-control" type="number" placeholder="Receiver Ethereum account">
      <input class="form-control" type="number" placeholder="Amount">
      <button class="btn-primary" @click="sendPayment">Send</button>
  </div>
</template>
<script>

