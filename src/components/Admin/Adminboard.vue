<script setup>
import useCounts from "@/composables/counts";
import Pending from "@/components/Admin/Pending.vue";
import Resolved from "@/components/Admin/Resolved.vue";
import { ref, onMounted } from "vue";

const { counts, getCounts } = useCounts();

onMounted(() => {
  getCounts();
});

const selectedOption = ref('pending');

const setOption = (option) => {
  selectedOption.value = option;
};

</script>

<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Dashboard</h1>
          </div>

          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="/">Home</a></li>
              <li class="breadcrumb-item active">Dashboard</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3 col-6">
            <div class="small-box bg-gradient-info">
              <div class="inner">
                <h3>{{ counts.totalTickets || 0 }}</h3>
                <p>Tickets Total</p>
              </div>
              <div class="icon">
                <i class="fas fa-tasks"></i>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-gradient-success">
              <div class="inner">
                <h3>{{ counts.resolvedTickets || 0 }}</h3>
                <p>Tickets Resolved</p>
              </div>
              <div class="icon">
                <i class="fas fa-thumbs-up"></i>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-gradient-danger">
              <div class="inner">
                <h3>{{ counts.pendingTickets || 0 }}</h3>
                <p>Tickets Pending</p>
              </div>
              <div class="icon">
                <i class="fas fa-pause"></i>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <div class="small-box bg-gradient-warning">
              <div class="inner">
                <h3>{{ counts.processingTickets || 0 }}</h3>
                <p>Processing Tickets</p>
              </div>
              <div class="icon">
                <i class="fas fa-truck-loading"></i>
              </div>
            </div>
          </div>
        </div>

        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card bg-gradient-dark">
                  <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-ticket-alt mt-2"></i> Ticket Requests:</h3>
                    <div class="card-tools">
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                      <label class="btn bg-gradient-warning" :class="{ active: selectedOption === 'pending'}">
                        <input type="radio" name="options" id="option_b1" autocomplete="off" @click="setOption('pending')" checked><i class="fas fa-pause mt-2"></i> Pending || Processing
                      </label>
                      <label class="btn bg-gradient-success" :class="{ active: selectedOption === 'resolved' }">
                        <input type="radio" name="options" id="option_b2" autocomplete="off" @click="setOption('resolved')"><i class="fas fa-check mt-2"></i> Resolved Tickets
                      </label>
                    </div>
                    </div>
                  </div>

                  <Pending v-if="selectedOption === 'pending'" />
                  <Resolved v-if="selectedOption === 'resolved'" />

                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </section>

  </div>
</template>

<style scoped>
.badge-danger {
  background-color: #dc3545;
}
.badge-warning {
  background-color: #ffc107;
}
.badge-info {
  background-color: #17a2b8;
}
.badge-success {
  background-color: #28a745;
}
.badge-secondary {
  background-color: #6c757d;
}
</style>
