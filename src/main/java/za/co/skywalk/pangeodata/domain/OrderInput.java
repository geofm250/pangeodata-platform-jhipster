package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A OrderInput.
 */
@Document(collection = "order_input")
public class OrderInput implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("name")
    private String name;

    @Field("order_id")
    private String orderId;

    @Field("label")
    private String label;

    @Field("input")
    private String input;

    @Field("i_cover_name")
    private String iCoverName;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public OrderInput name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOrderId() {
        return orderId;
    }

    public OrderInput orderId(String orderId) {
        this.orderId = orderId;
        return this;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getLabel() {
        return label;
    }

    public OrderInput label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getInput() {
        return input;
    }

    public OrderInput input(String input) {
        this.input = input;
        return this;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public String getiCoverName() {
        return iCoverName;
    }

    public OrderInput iCoverName(String iCoverName) {
        this.iCoverName = iCoverName;
        return this;
    }

    public void setiCoverName(String iCoverName) {
        this.iCoverName = iCoverName;
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
        OrderInput orderInput = (OrderInput) o;
        if (orderInput.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), orderInput.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrderInput{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", orderId='" + getOrderId() + "'" +
            ", label='" + getLabel() + "'" +
            ", input='" + getInput() + "'" +
            ", iCoverName='" + getiCoverName() + "'" +
            "}";
    }
}
