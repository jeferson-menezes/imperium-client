<template>
	<v-container fluid>
		<v-row>
			<router-view></router-view>
		</v-row>
		<v-row>
			<v-col cols="12">
				<v-card color="amber">
					<v-card-title primary-title>
						<v-icon x-large color="blue accent-2"
							>mdi-bookmark</v-icon
						>Lista de cartões
						<v-spacer></v-spacer>
						<CartaoForm />
						<CompraCartaoForm />
						<v-btn
							color="pink"
							fab
							dark
							small
							absolute
							top
							right
							v-on:click="$root.$emit('cartao-form::show', '')"
						>
							<v-icon>mdi-plus</v-icon>
						</v-btn>
					</v-card-title>
				</v-card>
			</v-col>

			<v-col>
				<v-sheet
					rounded="rounded"
					class="d-flex pa-2"
					color="amber"
					width="100%"
				>
					<v-card v-for="(cartao, i) in cartoes" :key="i">
						<v-card-title>
							{{ cartao.nome }}
						</v-card-title>

						<v-card-subtitle>
							<v-progress-linear
								background-color="light-green accent-3"
								color="red darken-1"
								height="5"
								:value="50"
							></v-progress-linear>
							limite {{ cartao.limite }}
						</v-card-subtitle>

						<v-card-actions>
							<v-row>
								<v-col>
									<v-btn
										class="mx-2"
										fab
										dark
										small
										color="primary"
									>
										<v-icon dark> mdi-pencil </v-icon>
									</v-btn>
								</v-col>
								<v-col>
									<v-btn
										class="mx-2"
										fab
										dark
										small
										color="orange"
										:to="'/cartao/' + cartao.id + '/faturas'"
										><v-icon>mdi-barcode</v-icon></v-btn
									>
								</v-col>
								<v-col>
									<v-btn
										class="mx-2"
										fab
										dark
										small
										color="red"
										v-on:click="
											$root.$emit(
												'compra-cartao-form::show',
												cartao
											)
										"
										><v-icon>mdi-shopping</v-icon></v-btn
									>
								</v-col>
							</v-row>
						</v-card-actions>
					</v-card>
				</v-sheet>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CartaoForm from "./CartaoForm";
import CompraCartaoForm from "./CompraCartaoForm";

export default {
	name: "Cartao",

	components: {
		CartaoForm,
		CompraCartaoForm,
	},

	data: () => ({}),

	methods: {
		...mapActions("cartao", ["ActionListarCartoes"]),
	},

	computed: {
		...mapState("auth", ["user"]),
		...mapState("cartao", ["cartoes"]),
	},

	mounted() {
		this.ActionListarCartoes({ id: this.user.id });
	},
};
</script>
