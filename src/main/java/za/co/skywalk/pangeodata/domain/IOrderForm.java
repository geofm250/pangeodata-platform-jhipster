package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A IOrderForm.
 */
@Document(collection = "i_order_form")
public class IOrderForm implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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
        IOrderForm iOrderForm = (IOrderForm) o;
        if (iOrderForm.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), iOrderForm.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IOrderForm{" +
            "id=" + getId() +
            "}";
    }
}
