<template>
  <div
    class="modal fade"
    id="successModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="successModalTitle"
    aria-hidden="true"
    ref="successModal"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="successModalTitle">Success!</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            Thank you for your order.<br> You will receive a response within 3 workdays.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "SuccessModal",
    props: {
        message: {
            default: "Thank you for your order.<br> You will receive a response within 3 workdays.",
            type: String
        }
    }
}
</script>
