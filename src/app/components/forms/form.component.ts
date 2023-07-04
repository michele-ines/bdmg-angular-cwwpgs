import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ViaCepService } from '../../services/via-cep.service';
import { States } from '../../models/enums/states.enum';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  enderecoForm!: FormGroup;
  isDisabled: boolean = true;
  estadoSuggestions: string[] = Object.values(States);

  constructor(
    private formBuilder: FormBuilder,
    private viacepService: ViaCepService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.enderecoForm = this.formBuilder.group({
      cep: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{5}-\d{3}$/),
          Validators.minLength(9),
          Validators.maxLength(9),
        ],
      ],
      logradouro: ['', Validators.required],
      complemento: [
        '',
        [Validators.required, Validators.pattern(/^\d+\.\d+$/)],
      ],
      bairro: ['', Validators.required],
      cidade: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      state: ['', Validators.required],
      ibge: { value: '', disabled: this.isDisabled },
      siafi: { value: '', disabled: this.isDisabled },
    });
  }

  buscarEndereco() {
    const cepControl = this.enderecoForm.get('cep');
    if (!cepControl) {
      console.error('Campo CEP não encontrado no formulário.');
      return;
    }

    const cep = cepControl.value;

    this.viacepService.getEndereco(cep).subscribe(
      (data: any) => {
        this.enderecoForm.patchValue(data);
      },
      (error: any) => {
        console.error('Ocorreu um erro ao buscar o endereço.', error);
      }
    );
  }

  clear(control: string): void {
    const formControl = this.enderecoForm.get(control);
    if (formControl) {
      formControl.setValue('');
    }
  }

  salvar() {
    const endereco = this.enderecoForm.value;
    localStorage.setItem('endereco', JSON.stringify(endereco));
  }
}
