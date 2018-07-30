package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A OrderForm.
 */
@Document(collection = "order_form")
public class OrderForm implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("form_type")
    private String formType;

    @Field("input")
    private String input;

    @Field("valid")
    private String valid;

    @Field("name")
    private String name;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFormType() {
        return formType;
    }

    public OrderForm formType(String formType) {
        this.formType = formType;
        return this;
    }

    public void setFormType(String formType) {
        this.formType = formType;
    }

    public String getInput() {
        return input;
    }

    public OrderForm input(String input) {
        this.input = input;
        return this;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public String getValid() {
        return valid;
    }

    public OrderForm valid(String valid) {
        this.valid = valid;
        return this;
    }

    public void setValid(String valid) {
        this.valid = valid;
    }

    public String getName() {
        return name;
    }

    public OrderForm name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        OrderForm orderForm = (OrderForm) o;
        if (orderForm.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderForm.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderForm{" +
            "id=" + getId() +
            ", formType='" + getFormType() + "'" +
            ", input='" + getInput() + "'" +
            ", valid='" + getValid() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
