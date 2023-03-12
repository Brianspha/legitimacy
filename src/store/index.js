import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import swal from "sweetalert2";

Vue.use(Vuex);

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    userAddress: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    history: [
      {
        firstPerson: {
          name: "John Walker",
          image: "https://picsum.photos/300/300?random=2",
          year: 2000,
          qualification: "Person",
          type: "person",
        },
        children: [
          {
            firstPerson: {
              name: "Good Primary School",
              image: "https://picsum.photos/300/300?random=3",
              year: 2000,
              qualification: "Grade 3 certificate",
              type: "primary",
            },
            secondPerson: {
              name: "Marvel Primary School",
              image: "https://picsum.photos/300/300?random=4",
              year: 2000,
              qualification: "Primary School certificate",
              type: "primary",
            },
            children: [
              {
                firstPerson: {
                  name: "Decent Seconadry School",
                  image: "https://picsum.photos/300/300?random=5",
                  year: 2000,
                  qualification: "Grade 8 certificate",
                  type: "secondary",
                },
                secondPerson: {
                  name: "Very Very Good Secondary School",
                  image: "https://picsum.photos/300/300?random=6",
                  year: 2000,
                  qualification: "High School certificate",
                  type: "secondary",
                },
                children: [
                  {
                    firstPerson: {
                      name: "Pruple University",
                      image: "https://picsum.photos/300/300?random=5",
                      year: 2000,
                      qualification: "Bachelors",
                      type: "tetiary",
                    },
                    children: [
                      {
                        firstPerson: {
                          name: "Certificate1",
                          image: "https://picsum.photos/300/300?random=6",
                          year: 2000,
                          qualification: "Certificate",
                          type: "misc",
                        },
                        secondPerson: {
                          name: "Certificate2",
                          image: "https://picsum.photos/300/300?random=7",
                          year: 2000,
                          qualification: "Certificate",
                          type: "misc",
                        },
                      },
                      {
                        firstPerson: {
                          name: "Certificate3",
                          image: "https://picsum.photos/300/300?random=8",
                          year: 2000,
                          qualification: "Certificate",
                          type: "misc",
                        },
                        secondPerson: {
                          name: "Certificate4",
                          image: "https://picsum.photos/300/300?random=9",
                          year: 2000,
                          qualification: "Certificate",
                          type: "misc",
                        },
                      }
                    ]
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    showModal: false,
    qualification: {},
    isLoading: false,
  },
  plugins: [createPersistedState()],
  modules: {},
  actions: {
    success(_context, message) {
      swal.fire({
        position: "top-end",
        icon: "success",
        title: "Success",
        showConfirmButton: false,
        timer: 2500,
        text: message,
      });
    },
    successWithCallBack(_context, message) {
      swal
        .fire({
          position: "top-end",
          icon: "success",
          title: "Success",
          showConfirmButton: true,
          text: message.message,
        })
        .then((results) => {
          if (results.isConfirmed) {
            message.onTap();
          }
        });
    },
    warning(_context, message) {
      swal.fire("Warning", message.warning, "warning").then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          message.onTap();
        }
      });
    },
    error(_context, message) {
      console.log("shwoing error message: ", message.error);
      swal.fire("Error!", message.error, "error").then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          console.log("leveled");
        }
      });
    },
    successWithFooter(_context, message) {
      swal.fire({
        icon: "success",
        title: "Success",
        text: message.message,
        footer: `<a href= https://testnet.bscscan.com/tx/${message.txHash}> View on Etherscan</a>`,
      });
    },
    errorWithFooterMetamask(_context, message) {
      swal.fire({
        icon: "error",
        title: "Error!",
        text: message,
        footer: `<a href= https://metamask.io> Download Metamask</a>`,
      });
    },
  },
});

export default store;
